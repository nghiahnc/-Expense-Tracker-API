Expense Tracker API
Overview

Expense Tracker API is a simple backend service built with Encore.ts that allows users to manage expenses, categorize them, and generate monthly summary reports. The API is deployed to the cloud using Encore.ts and uses in-memory caching to improve performance for frequently accessed summary data.

Features

Add new expenses with amount, category, and date

Update existing expenses

Categorize expenses

Generate monthly expense summaries grouped by category

Cache monthly summary reports to reduce repeated computation

Deployable and observable using Encore.ts

API Endpoints
Add Expense

POST /expenses

Request body:

{
  "id": "1",
  "amount": 200,
  "category": "Food",
  "date": "2026-01-10"
}

Update Expense

PUT /expenses/:id

Request body:

{
  "amount": 250,
  "category": "Food"
}

Monthly Expense Summary (Cached)

GET /expenses/summary/:month

Example:

GET /expenses/summary/2026-01


Response:

First request calculates the summary

Subsequent requests return cached data for faster response

Caching Strategy

The API uses in-memory caching with a Map to store monthly summary results.
When a summary for a specific month is requested:

If cached data exists, it is returned immediately

If not, the summary is calculated, stored in cache, and then returned

This approach reduces processing time for repeated requests.
