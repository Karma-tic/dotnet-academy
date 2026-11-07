# Capstone 4: E-Commerce REST API

## Overview
A commercial-grade multi-endpoint Web API managing catalog pagination, filtering, session-based cart management, pricing calculations, and order checkout flows.

## Endpoints
- \`GET /api/products?page=1&pageSize=10&category=Books\`: Offset-based pagination and filtering.
- \`POST /api/cart/{cartId}/items\`: Add products to in-memory/persisted cart.
- \`POST /api/cart/{cartId}/checkout\`: Validates inventory, clears cart, and creates confirmed order.

## Running Locally
```bash
dotnet run --project samples/Capstones/Capstone4_EcommerceApi
```

