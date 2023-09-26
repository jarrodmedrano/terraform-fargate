resource "aws_ecr_repository" "repository" {
  name                 = "${var.application}-registry-newish"
  image_tag_mutability = "MUTABLE"

  image_scanning_configuration {
    scan_on_push = true
  }
}