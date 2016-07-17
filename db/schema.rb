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

ActiveRecord::Schema.define(version: 20160716183320) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "answer_choices", force: :cascade do |t|
    t.text     "text",                               null: false
    t.boolean  "correct",            default: false, null: false
    t.integer  "problem_id"
    t.string   "image_file_name"
    t.string   "image_content_type"
    t.integer  "image_file_size"
    t.datetime "image_updated_at"
    t.integer  "order"
  end

  add_index "answer_choices", ["problem_id"], name: "index_answer_choices_on_problem_id", using: :btree

  create_table "assessments", force: :cascade do |t|
    t.integer "source_id"
    t.string  "title"
    t.text    "description"
    t.text    "instructions"
  end

  add_index "assessments", ["source_id"], name: "index_assessments_on_source_id", using: :btree

  create_table "images", force: :cascade do |t|
    t.string   "name"
    t.text     "description"
    t.string   "content_file_name"
    t.string   "content_content_type"
    t.integer  "content_file_size"
    t.datetime "content_updated_at"
    t.integer  "order"
  end

  create_table "images_problems", force: :cascade do |t|
    t.integer "image_id"
    t.integer "problem_id"
  end

  add_index "images_problems", ["image_id"], name: "index_images_problems_on_image_id", using: :btree
  add_index "images_problems", ["problem_id"], name: "index_images_problems_on_problem_id", using: :btree

  create_table "levels", force: :cascade do |t|
    t.string "name"
  end

  create_table "notes", force: :cascade do |t|
    t.text     "content"
    t.string   "title"
    t.string   "picture_file_name"
    t.string   "picture_content_type"
    t.integer  "picture_file_size"
    t.datetime "picture_updated_at"
    t.integer  "assessment_id"
  end

  add_index "notes", ["assessment_id"], name: "index_notes_on_assessment_id", using: :btree

  create_table "problems", force: :cascade do |t|
    t.text    "question"
    t.integer "source_id"
    t.decimal "number"
    t.integer "section_id"
    t.boolean "requires_associated_images"
    t.boolean "requires_associated_texts"
  end

  add_index "problems", ["section_id"], name: "index_problems_on_section_id", using: :btree
  add_index "problems", ["source_id"], name: "index_problems_on_source_id", using: :btree

  create_table "problems_texts", force: :cascade do |t|
    t.integer "problem_id"
    t.integer "text_id"
  end

  add_index "problems_texts", ["problem_id"], name: "index_problems_texts_on_problem_id", using: :btree
  add_index "problems_texts", ["text_id"], name: "index_problems_texts_on_text_id", using: :btree

  create_table "sections", force: :cascade do |t|
    t.string  "name"
    t.text    "notes"
    t.integer "source_id"
  end

  add_index "sections", ["source_id"], name: "index_sections_on_source_id", using: :btree

  create_table "source_types", force: :cascade do |t|
    t.string "name"
  end

  create_table "sources", force: :cascade do |t|
    t.string   "name",                         null: false
    t.text     "notes"
    t.string   "document_file_name"
    t.string   "document_content_type"
    t.integer  "document_file_size"
    t.datetime "document_updated_at"
    t.integer  "subject_id"
    t.integer  "level_id"
    t.integer  "publication_month"
    t.integer  "publication_year"
    t.integer  "source_type_id"
    t.integer  "bootstrap_number_of_sections"
  end

  add_index "sources", ["level_id"], name: "index_sources_on_level_id", using: :btree
  add_index "sources", ["source_type_id"], name: "index_sources_on_source_type_id", using: :btree
  add_index "sources", ["subject_id"], name: "index_sources_on_subject_id", using: :btree

  create_table "subjects", force: :cascade do |t|
    t.string "name"
    t.text   "notes"
  end

  create_table "tag_relationships", force: :cascade do |t|
    t.text    "description"
    t.integer "tagged_id"
    t.string  "tagged_type"
    t.integer "tag_id"
  end

  add_index "tag_relationships", ["tag_id"], name: "index_tag_relationships_on_tag_id", using: :btree
  add_index "tag_relationships", ["tagged_type", "tagged_id"], name: "index_tag_relationships_on_tagged_type_and_tagged_id", using: :btree

  create_table "tag_types", force: :cascade do |t|
    t.string "name"
    t.text   "description"
  end

  create_table "tags", force: :cascade do |t|
    t.string  "name"
    t.integer "tag_type_id"
    t.text    "description"
  end

  add_index "tags", ["tag_type_id"], name: "index_tags_on_tag_type_id", using: :btree

  create_table "texts", force: :cascade do |t|
    t.text    "content"
    t.integer "order"
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

  add_foreign_key "assessments", "sources"
  add_foreign_key "images_problems", "images"
  add_foreign_key "images_problems", "problems"
  add_foreign_key "notes", "assessments"
  add_foreign_key "problems", "sections"
  add_foreign_key "problems", "sources"
  add_foreign_key "problems_texts", "problems"
  add_foreign_key "problems_texts", "texts"
  add_foreign_key "sections", "sources"
  add_foreign_key "sources", "levels"
  add_foreign_key "sources", "source_types"
  add_foreign_key "sources", "subjects"
  add_foreign_key "tag_relationships", "tags"
  add_foreign_key "tags", "tag_types"
end
