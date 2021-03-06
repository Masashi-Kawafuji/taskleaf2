class TasksController < ApplicationController
  before_action :set_task, only: [:show, :edit, :destroy]
  skip_before_action :verify_authenticity_token

  def index
    @q = current_user.tasks.ransack(params[:q])
    @tasks = @q.result(distinct: true).page(params[:page])

    respond_to do |format|
      format.html
      format.csv { send_data @tasks.generate_csv, filename: "tasks-#{Time.zone.now.strftime('%Y%m%d%S')}.csv" }
    end
  end

  def export
    @tasks = current_user.tasks.order(created_at: 'desc')
    render json: @tasks
  end

  def import
    current_user.tasks.import(params[:file])
    redirect_to tasks_url, notice: 'タスクを追加しました'
  end

  def show
    @task = current_user.tasks.find(params[:id])
  end

  def new
    @task = Task.new
  end

  def confirm_new
    @task = current_user.tasks.new(task_params)
    render :new unless @task.valid?
  end

  def create
    @task = current_user.tasks.new(task_params)

    if params[:back].present?
      render 'new'
      return
    end

    if @task.save
      # TaskMailer.creation_email(@task).deliver_now
      # SampleJob.perform_later
      redirect_to root_path, notice: "タスク「#{@task.name}」を登録しました。"
    else
      render :new
    end
  end

  def edit
    @task = current_user.tasks.find(params[:id])
  end

  def update
    @task = current_user.tasks.find(params[:id])
    @task.update!(task_params)
    head :no_content
    # redirect_to tasks_url, notice: "タスク「#{@task.name}」を更新しました。"
  end

  def destroy
    # @task = current_user.tasks.find(params[:id])
    @task = Task.find_by(id: params[:id], user_id: current_user.id)
    @task.destroy
    head :no_content
  end

  def done
    @task = Task.find(params[:id])
    @task.update(done: !@task.done)
    head :no_content
  end

  private

  def task_params
    params.require(:task).permit(:name, :description, :image)
  end

  def set_task
    @task = current_user.tasks.find(params[:id])
  end
end
