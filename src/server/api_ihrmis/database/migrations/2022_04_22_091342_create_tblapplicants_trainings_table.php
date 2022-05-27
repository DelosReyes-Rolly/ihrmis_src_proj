<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTblapplicantsTrainingsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tblapplicants_trainings', function (Blueprint $table) {
            $table->unsignedInteger('trn_app_id')->comment('Applicant ID. Identifies the related applicant.');
            $table->dateTime('trn_app_time')->useCurrent()->comment('Timestamp or date and time the record is created. Served as a secondary key for a unique identification of records.');
            $table->string('trn_app_title')->comment('Full titles of learning and development (L&D) interventions/ training programs attended during employment.');
            $table->date('trn_app_from')->comment('Starting date of training.');
            $table->date('trn_app_to')->comment('Ending date of training.');
            $table->unsignedTinyInteger('trn_app_hours')->comment('Number of hours attended.');
            $table->string('trn_app_type', 30)->comment('Type of learning interventions (e.g. managerial, supervisory, etc.)');
            $table->string('trn_app_sponsor')->comment('Full name of institution/agency that conducted or sponsored the program.');
            $table->string('trn_app_cmptncy')->comment('Competency addressed by the intervention. Added field to provide additional data to compare with related keywords.');
            $table->primary(['trn_app_id', 'trn_app_time']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tblapplicants_trainings');
    }
}
