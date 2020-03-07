FactoryBot.define do
  factory :user do
    one { 'author' }
    name { 'テストユーザー' }
    email { 'test1@example.com' }
    password { 'password' }
    password_confirmation { 'password' }
  end
end
 
