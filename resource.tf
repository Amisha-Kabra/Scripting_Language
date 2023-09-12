# Provides a VPC resource.
resource "aws_vpc" "main" {
  cidr_block       = "10.0.0.0/16"
  enable_dns_support = true
  enable_dns_hostnames = true
  tags = {
    Name = "main"
  }
}

# Provides an VPC subnet resource. -- Public
resource "aws_subnet" "aws_public_subnet" {
  count             = length(var.public_subnet_cidr)
  vpc_id            = aws_vpc.main.id
  cidr_block        = element(var.public_subnet_cidr, count.index)
  availability_zone = element(var.availability_zone, count.index)
 
  tags = {
   Name = "Public Subnet ${count.index + 1}"
  }
}

# Provides an VPC subnet resource. -- Private
resource "aws_subnet" "aws_private_subnet" {
  count             = length(var.private_subnet_cidr)
  vpc_id            = aws_vpc.main.id
  cidr_block        = element(var.private_subnet_cidr, count.index)
  availability_zone = element(var.availability_zone, count.index)
 
  tags = {
   Name = "Private Subnet ${count.index + 1}"
  }
}

# Provides a resource to create a VPC Internet Gateway.
resource "aws_internet_gateway" "internet_gateway" {
 vpc_id            = aws_vpc.main.id
 
 tags = {
   Name = "Project VPC IG"
 }
}

# Provides a resource to create a VPC routing table.
resource "aws_route_table" "second_route_table" {
 vpc_id            = aws_vpc.main.id
 
 route {
   cidr_block      = "0.0.0.0/0"
   gateway_id      = aws_internet_gateway.internet_gateway.id
 }
 
 tags = {
   Name = "2nd Route Table"
 }
}

# Provides a resource to create an association between a route table and a subnet or a route table and an internet gateway or virtual private gateway.
resource "aws_route_table_association" "public_subnet_association" {
 count             = length(var.public_subnet_cidr)
 subnet_id         = element(aws_subnet.aws_public_subnet[*].id, count.index)
 route_table_id    = aws_route_table.second_route_table.id
}

# Provides an EC2 key pair resource. 
resource "tls_private_key" "key" {
algorithm          = "RSA"
}

resource "local_file" "private_key" {
filename           = "terraform_App.pem"
sensitive_content  = tls_private_key.key.private_key_pem
file_permission    = "0400"
}

resource "aws_key_pair" "key_pair" {
key_name           = "terraform_App"
public_key         = tls_private_key.key.public_key_openssh
}

# Provides a security group resource.
resource "aws_security_group" "terraform_security_group" {
  name            = "terraform_security_group"
  description     = "Terraform Security Group"
  vpc_id          = aws_vpc.main.id

  ingress {
    description      = "TLS from VPC"
    from_port        = 443
    to_port          = 443
    protocol         = "tcp"
    cidr_blocks      = ["0.0.0.0/0"]
   
  }
 ingress {
    description      = "TLS from VPC2"
    from_port        = 80
    to_port          = 80
    protocol         = "tcp"
    cidr_blocks      = ["0.0.0.0/0"]

  }
   ingress {
    description      = "TLS from VPC3"
    from_port        = 22
    to_port          = 22
    protocol         = "tcp"
    cidr_blocks      = ["0.0.0.0/0"]

  }
  egress {
    from_port        = 0
    to_port          = 0
    protocol         = "-1"
    cidr_blocks      = ["0.0.0.0/0"]

  }

  tags = {
    Name = "terraform_security_group"
  }
}

resource "aws_instance" "tf_app_1" {
  count            = length(var.public_subnet_cidr)
  associate_public_ip_address= true
  ami              = "ami-053b0d53c279acc90"
  instance_type    = "t2.micro"
  subnet_id        = aws_subnet.aws_public_subnet[count.index ].id
  key_name         =  aws_key_pair.key_pair.id
  security_groups  =[aws_security_group.terraform_security_group.id]
  user_data = <<EOF
#!/bin/bash
echo "Start User Data scripting"
apt update
apt install nginx -y
echo "Hello Amisha I am EC2 instance and my name is tf_app_${count.index + 1 }" > /var/www/html/index.html
echo "End User Data Scripting"
EOF
  tags = {
    Name = "tf_app_${count.index + 1 }"
  }
}

# Provides a Load Balancer resource.
resource "aws_lb" "load_balancer" {
  name               = "test-lb-tf"
  internal           = false
  load_balancer_type = "application"
  security_groups    = [aws_security_group.terraform_security_group.id]
  subnets            = [for subnet in aws_subnet.aws_public_subnet : subnet.id]

  enable_deletion_protection = true


  tags = {
    Environment = "Dev"
  }
}

# Provides a Target Group resource for use with Load Balancer resources.
resource "aws_lb_target_group" "target_group" {
  name     = "tf-lb-tg"
  port     = 80
  protocol = "HTTP"
  vpc_id   = aws_vpc.main.id

  
}


resource "aws_lb_listener" "listener_http" {
  load_balancer_arn = aws_lb.load_balancer.arn
  port              = "80"
  protocol          = "HTTP"

  default_action {
    target_group_arn = aws_lb_target_group.target_group.arn
    type             = "forward"
  }
}

resource "aws_lb_target_group_attachment" "register" {
  count = length(var.public_subnet_cidr)
  target_group_arn = aws_lb_target_group.target_group.arn
  target_id        = aws_instance.tf_app_1[count.index].id
  port             = 80
}