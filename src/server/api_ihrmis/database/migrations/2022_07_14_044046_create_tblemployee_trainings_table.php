<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTblemployeeTrainingsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tblemployee_trainings', function (Blueprint $table) {
            $table->integer('trn_id', true)->comment('Timestamp or date and time the record is created. Served as a secondary key for a unique identification of records. || Identifier');
            $table->unsignedInteger('trn_emp_id')->index('trn_emp_id')->comment('Employee ID. Identifies the related employee.');
            $table->string('trn_emp_title')->comment('Full titles of learning and development (L&D) interventions/ training programs attended during employment.');
            $table->date('trn_emp_from')->comment('Starting date of training.');
            $table->date('trn_emp_to')->comment('Ending date of training.');
            $table->unsignedTinyInteger('trn_emp_hours')->comment('Number of hours attended.');
            $table->string('trn_emp_type', 30)->comment('Type of learning interventions (e.g. managerial, supervisory, etc.)');
            $table->string('trn_emp_sponsor')->comment('Full name of institution/agency that conducted or sponsored the program.');
            $table->string('trn_emp_cmptncy')->comment('Competency addressed by the intervention. Added field to provide additional data to compare with related keywords.');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tblemployee_trainings');
    }
}
