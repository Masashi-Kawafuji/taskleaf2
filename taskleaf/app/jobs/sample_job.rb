class SampleJob < ApplicationJob
  queue_as :default

  def perform(*args)
    Slidekiq::Logging.logger.info 'サンプルジョブを実行しました'
  end
end
