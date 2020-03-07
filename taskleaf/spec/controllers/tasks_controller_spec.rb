require_relative '../rails_helper'

describe TasksController do
  let!(:user) { FactoryBot.create(:user) }

  before do
    session[:user_id] = user.id
  end

  describe 'GET #index' do
    # let(:task) { FactoryBot.create(:task, user_id: user) }
    before do
      # login_user user
      @task = FactoryBot.create(:task, user_id: user.id)
      get :index
    end

    it 'has a 200 status code' do
      expect(response).to have_http_status(:ok)
    end

    it 'assigns @tasks' do
      expect(@task.name).to eq 'テストを書く'
    end

    it 'renders the :index template' do
      expect(response).to render_template :index
    end
  end

  # describe 'GET #show' do
  #   it(:task) { FactoryBot.create(:task) }
  #   before { get :show, params: {id: task.id} }
  #
  #   it 'has a 200 status code' do
  #     expect(response).to have_http_status(:ok)
  #   end
  #
  #   it 'assigns @task' do
  #     expect(assigns(:task)).to eq task
  #   end
  #
  #   it 'renders the :show template' do
  #     expect(response).to render_template :show
  #   end
  # end
  #
  # describe 'POST #create' do
  #   let(:task_attributes) { FactoryBot.attributes_for(:task) }
  #
  #   it 'saves new article' do
  #     expect do
  #       post :create, params: { task: task_attributes }
  #     end.to change(Task, :count).by(1)
  #   end
  #
  #   it 'redirects the :create template' do
  #     post :create, params: { task: task_attributes }
  #     task = Task.last
  #     expect(response).to redirect_to tasks_path(task)
  #   end
  # end
  #
  # describe 'GET #edit' do
  #   let(:task) { FactoryBot.create(:task) }
  #   before { get :edit, params: { id: task.id } }
  #
  #   it 'has a 200 status code' do
  #     expect(response).to have_http_status(:ok)
  #   end
  #
  #
  #   it 'assigns @task' do
  #     expect(assigns(:task)).to eq task
  #   end
  #
  #   it 'renders the :edit template' do
  #     expect(response).to render_template :edit
  #   end
  # end
  #
  # describe 'PATCH #update' do
  #   let(:task) { FactoryBot.create(:task) }
  #   let(:update_attributes) { {name: 'updated_name', description: 'updated_description'} }
  #
  #   it 'saves updated article' do
  #     expect do
  #       patch :update, params: { id: task.id }
  #     end.to change(Task, :count).by(0)
  #   end
  #
  #   it  'updates updated task' do
  #     patch :update, params: { id: task.id }
  #     task.reload
  #     expect(task.name).to eq update_attributes[:name]
  #     expect(task.description).to eq update_attributes[:description]
  #   end
  #
  #   it 'redirects the :index template' do
  #     patch :update, params: { id: task.id }
  #     task = Task.last
  #     expect(response).to render_template tasks_path(task)
  #   end
  # end
  #
  # describe 'DELETE #destroy' do
  #   let!(:task) { FactoryBot.create(:task) }
  #
  #   it 'deletes the article' do
  #     expect do
  #       delete :destroy, params: { id: task.id }
  #     end.to change(Task, :count).by(-1)
  #   end
  #
  #   it 'redirects the :index template' do
  #     delete :destroy, params: { id: task.id }
  #     expect(response).to render_template tasks_path
  #   end
  # end
end
