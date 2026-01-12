

A simple Expense Tracker API built with Encore.ts.
The API allows managing expenses, generating monthly summaries, and improves performance using caching.

#Features
Add and update expenses
Categorize expenses
Generate monthly expense summaries by category
Cache summary reports
Deploy and monitor using Encore.ts

API Endpoints
#Add Expense
POST /expenses
#Update Expense
PUT /expenses/:id
#Monthly Summary
GET /expenses/summary/:month
