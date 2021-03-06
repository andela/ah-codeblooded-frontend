[![Build Status](https://travis-ci.org/andela/ah-codeblooded-frontend.svg?branch=develop)](https://travis-ci.org/andela/ah-codeblooded-frontend)
[![Test Coverage](https://api.codeclimate.com/v1/badges/3c7e03b1597a8927f9f4/test_coverage)](https://codeclimate.com/github/andela/ah-codeblooded-frontend/test_coverage)
[![Maintainability](https://api.codeclimate.com/v1/badges/3c7e03b1597a8927f9f4/maintainability)](https://codeclimate.com/github/andela/ah-codeblooded-frontend/maintainability)

# Authors Haven - A Social platform for the creative at heart.

## Vision

Create a community of like minded authors to foster inspiration and innovation
by leveraging the modern web.

---

## Functionality

The web-based platform allows the user to perform the following activities:

### Authentication

- User can register for a free account (Normal and Social e.g. Facebook)
- User can login to their account
- Authenticated user can update their profile (bio and avatar)

### Interactions

- Authenticated users can follow/unfollow other users
- Authenticated users can engage other authors through comments, likes/dislikes e.t.c

### Articles

- Authenticated users can `publish`, `read`, `update`, and `delete` articles
- Authenticated users can `comment on an article`
- Authenticated users can `comment on a comment`
- Authenticated users can `like/dislike an article`
- Authenticated users can `rate an article`
- Authenticated users can `favorite/unfavorite an article`
- Authenticated users can `search` for articles and `filter` them based on `title` , `author` , and `tags`

### Notifications

- Authenticated users can opt in/out of email subscriptions
- Authenticated users can recieve in-app notifications

### Errors and Status Codes

If a request fails any validations, expect errors in the following format:
