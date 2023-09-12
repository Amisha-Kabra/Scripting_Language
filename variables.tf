variable "aws_region" {
  default = "us-east-1"
  description = "AWS region"
}

variable "public_subnet_cidr" {
  default = ["10.0.1.0/24","10.0.2.0/24","10.0.5.0/24"]
  description = "Public Subnet CIDR ranges"
}

variable "private_subnet_cidr" {
  default = ["10.0.3.0/24","10.0.4.0/24","10.0.6.0/24"]
  description = "Private Subnet CIDR ranges"
}

variable "availability_zone" {
  default = ["us-east-1a","us-east-1b","us-east-1c"]
  description = "Availability Zone"
}

