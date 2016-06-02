# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160602173745) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "answer_choices", force: :cascade do |t|
    t.text    "text",                       null: false
    t.boolean "correct",    default: false, null: false
    t.integer "problem_id"
  end

  add_index "answer_choices", ["problem_id"], name: "index_answer_choices_on_problem_id", using: :btree

  create_table "images", force: :cascade do |t|
    t.string   "name"
    t.text     "description"
    t.integer  "problem_id"
    t.string   "content_file_name"
    t.string   "content_content_type"
    t.integer  "content_file_size"
    t.datetime "content_updated_at"
    t.integer  "order"
  end

  add_index "images", ["problem_id"], name: "index_images_on_problem_id", using: :btree

  create_table "problem_images", force: :cascade do |t|
    t.string   "name"
    t.text     "description"
    t.integer  "problem_id"
    t.string   "content_file_name"
    t.string   "content_content_type"
    t.integer  "content_file_size"
    t.datetime "content_updated_at"
  end

  add_index "problem_images", ["problem_id"], name: "index_problem_images_on_problem_id", using: :btree

  create_table "problems", force: :cascade do |t|
    t.string  "name"
    t.text    "question"
    t.integer "source_id"
  end

  add_index "problems", ["source_id"], name: "index_problems_on_source_id", using: :btree

  create_table "sources", force: :cascade do |t|
    t.string   "name",                  null: false
    t.text     "description"
    t.string   "document_file_name"
    t.string   "document_content_type"
    t.integer  "document_file_size"
    t.datetime "document_updated_at"
  end

  create_table "texts", force: :cascade do |t|
    t.string  "name"
    t.text    "content"
    t.integer "problem_id"
    t.integer "order"
  end

  create_table "user_invitations", force: :cascade do |t|
    t.text    "email"
    t.boolean "is_admin",   default: false
    t.boolean "is_teacher", default: false
  end

  create_table "users", force: :cascade do |t|
    t.string   "email",                  default: "",    null: false
    t.string   "encrypted_password",     default: "",    null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,     null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet     "current_sign_in_ip"
    t.inet     "last_sign_in_ip"
    t.string   "invitation_token"
    t.datetime "invitation_created_at"
    t.datetime "invitation_sent_at"
    t.datetime "invitation_accepted_at"
    t.integer  "invitation_limit"
    t.integer  "invited_by_id"
    t.string   "invited_by_type"
    t.integer  "invitations_count",      default: 0
    t.boolean  "is_admin",               default: false
    t.boolean  "is_teacher",             default: false
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["invitation_token"], name: "index_users_on_invitation_token", unique: true, using: :btree
  add_index "users", ["invitations_count"], name: "index_users_on_invitations_count", using: :btree
  add_index "users", ["invited_by_id"], name: "index_users_on_invited_by_id", using: :btree
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree

  add_foreign_key "images", "problems"
  add_foreign_key "problem_images", "problems"
  add_foreign_key "problems", "sources"
end
