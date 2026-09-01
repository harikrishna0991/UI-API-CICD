terraform {
  backend "azurerm" {
    resource_group_name  = "rg-terraform-state-prod"
    storage_account_name = "sttfstate84729"
    container_name       = "pit2026"
    key                  = "ui-api-cicd.tfstate"

    use_oidc         = true
    use_azuread_auth = true
  }
}