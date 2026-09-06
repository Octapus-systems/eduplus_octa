---
trigger: always_on
---

# EduPlus — Prototype Development Rules

## 1. Project Purpose

**EduPlus is strictly a prototype/demo project.**

The purpose of this project is to demonstrate the **UI/UX, screens, user flows, interactions, and overall product experience**.

Do **not** treat EduPlus as a production application.

## 2. No Backend Logic

**Strictly do NOT create, implement, or connect any backend logic.**

* No backend APIs
* No database
* No API integrations
* No authentication backend
* No server-side logic
* No real data processing
* No real-time backend functionality
* No database models or schemas
* No backend services
* No external service integrations unless specifically requested for a visual demo

**Hardcoded/mock data is completely sufficient.**

If a feature normally requires backend functionality, simulate it using hardcoded or local demo data so the feature can be demonstrated visually.

## 3. Demo-Only Functionality

Every module should be built to **look and behave like a working product**, but internally it can use simple hardcoded/mock data.

For example:

* Student lists → hardcoded students
* Attendance → hardcoded attendance records
* Quiz results → hardcoded results
* Notifications → hardcoded notifications
* Dashboard statistics → hardcoded values
* Reports → hardcoded demo data
* Search → frontend-only filtering
* Filters → frontend-only filtering
* Add/Edit/Delete → simulate the interaction locally
* Status changes → update the UI locally
* Forms → demonstrate submission visually without backend processing

The goal is **demo functionality, not production functionality**.

## 4. Follow the Existing UI/UX

When creating any new module, screen, page, component, or feature:

**Always follow the existing EduPlus application's current UI/UX.**

Do not introduce a completely different design style.

Maintain consistency with the existing:

* Theme
* Colors
* Typography
* Spacing
* Buttons
* Cards
* Tables
* Forms
* Inputs
* Dropdowns
* Modals
* Navigation
* Sidebar
* Icons
* Page layouts
* Component styles
* Responsive behavior
* Light/Dark theme behavior

New features should feel like they were originally designed as part of the same EduPlus application.

## 5. Reuse Existing Components

Before creating a new UI component, check whether an equivalent component already exists in the current application.

**Prefer reusing and extending existing components rather than creating a completely new design.**

For example, if the application already has:

* A standard table
* A standard modal
* A standard button
* A standard form
* A standard card
* A standard dropdown
* A standard page header

Use the existing design pattern for the new module.

## 6. Do Not Over-Engineer

Because EduPlus is only a prototype:

**Keep implementation simple.**

Do not spend time building production-level architecture, backend infrastructure, database systems, complex state management, security systems, or scalable data processing unless specifically requested.

The priority is:

**UI/UX → User Flow → Demo Interaction → Visual Quality**

Not:

**Backend → Database → Production Architecture**

## 7. Branch / Git Rule

**STRICT RULE: DO NOT PUSH ANYTHING TO ANY BRANCH.**

Do not:

* Push commits
* Push code
* Create pull requests
* Merge branches
* Modify remote branches
* Publish changes to a repository

Make the required changes locally only.

**Never push the project to a branch unless I explicitly instruct you to do so.**

## 8. When Building a New Demo Module

For every new module:

1. Understand the requested feature.
2. Check the existing EduPlus UI/UX.
3. Follow the existing design system.
4. Reuse existing components wherever possible.
5. Build the required screens and user flows.
6. Use hardcoded/mock data.
7. Make interactions work locally for demonstration purposes.
8. Do not create backend logic.
9. Do not create unnecessary production architecture.
10. Do not push anything to any branch.

## 9. Priority Rule

If there is ever a choice between building complex backend functionality and creating a convincing frontend demonstration:

**Choose the frontend demonstration.**

The final result should make the feature **look and feel complete during a demo**, even though the underlying data and logic are simulated.

## 10. Absolute Rule

> **EduPlus is a prototype only. Build for demonstration, not production. Use hardcoded/mock data. No backend logic is required. Follow the current application's UI/UX and theme for every new feature. Do not push anything to any Git branch unless explicitly instructed.**
