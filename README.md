# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...

## usersテーブル

|Column|Type|Options|
|------|----|-------|
|nickname|string|null: false|index: true|
|email|string|null: false|
|password|string|null: false|

### Association
- has_many :groups_users
- has_many :groups,through: :groups_users
- has_many :comments





## groups_usersテーブル

|Column|Type|Options|
|------|----|-------|
|user|references|integer|null: false, foreign_key: true|
|group|references|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user






## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false|

### Association
- has_many :users,through: :groups_users
- has_many :groups_users
- has_many :comments







## commentsテーブル

|Column|Type|Options|
|------|----|-------|
|text|text|
|image|string|
|group|references|integer|null: false, foreign_key: true|
|user|references|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user