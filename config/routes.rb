Rails.application.routes.draw do
  devise_for :users
  mount RailsAdmin::Engine => '/admin', as: 'rails_admin'

  root to: 'home#index'

  get 'problems_parser', to: 'problems#parser'

  get 'problems', to: 'problems#index'
  get 'problems/:id', to: 'problems#show', as: :problem
  get 'problems_editor', to: 'problems#editor', as: :problems_editor
  get 'problems_tagger', to: 'problems#tagger', as: :problems_tagger

  post 'problems', to: 'problems#create', as:  :create_problem

  get 'sources_for_select', to: 'sources#for_select', as: :sources_for_select

  get 'sources', to: 'sources#index', as: :sources


  get 'sources_by_subject/:id', to: 'sources#by_subject', as: :sources_by_subject

  get 'problems_by_source/:id', to: 'problems#by_source', as: :problems_by_source
  get 'problems_by_section/:id', to: 'problems#by_section', as: :problems_by_section

  get 'search_tags/:tag_type_name/:query', to: 'tags#search'

  post 'tag_relationships', to: 'tag_relationships#create'

  get 'action_tags_for_select', to: 'tags#action_tags_for_select'

  post 'problems_topics', to: 'problems_topics#create'

  get 'tag_types_for_select', to: 'tag_types#for_select'
  get 'action_tag_types_for_select', to: 'tag_types#actions_for_select'

  get 'sections', to: 'sections#index', as: :sections

  get 'sections_by_source/:id', to: 'sections#by_source'

  get 'subjects', to: 'subjects#index', as: :subjects

  get 'subjects_for_select', to: 'subjects#for_select'


  get 'topics_for_select', to: 'topics#for_select'

  get 'tag_groups/:tag_type_id/:subject_id', to: 'tag_groups#index'

  get 'tag_groups_for_select', to: 'tag_groups#for_select'

  get 'students', to: 'students#index'

  get 'tags_source', to: 'students#get_tags_source'
  get 'topic_problems', to: 'students#get_topics_problem'
  get 'collection_problems', to: 'students#get_collection_problems'

  post 'get_problems', to: 'students#get_problems'

  post 'add_collection', to: 'students#add_collection'
  post 'edit_collection', to: 'students#edit_collection'
  post 'problems_to_collection', to: 'students#problems_to_collection'

  delete 'delete_collection', to: 'students#delete_collection'
  post 'remove_problem_collection', to: 'students#remove_problem_collection'

  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  # root 'welcome#index'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
