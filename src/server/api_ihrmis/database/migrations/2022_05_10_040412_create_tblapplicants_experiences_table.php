<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTblapplicantsExperiencesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tblapplicants_experiences', function (Blueprint $table) {
            $table->unsignedInteger('exp_app_id')->comment('Applicant ID. Identifies the related applicant.');
            $table->dateTime('exp_app_time')->useCurrent()->comment('Timestamp or date and time the record is created. Served as a secondary key for a unique identification of records.');
            $table->date('exp_app_from')->comment('Starting date of affiliation.');
            $table->date('exp_app_to')->comment('Ending date of affiliation.');
            $table->string('exp_app_position', 150)->comment('Title of position held.');
            $table->string('exp_app_agency')->comment('Name of department/agency/office/company in full.');
            $table->decimal('exp_app_salary', 14)->unsigned()->comment('Monthly salary in figures.');
            $table->unsignedTinyInteger('exp_app_grade')->comment('Salary grade, if applicable.');
            $table->unsignedTinyInteger('exp_app_step')->comment('Salary step increment, if applicable.');
            $table->char('exp_app_appntmnt', 2)->comment('Status of employment or appointment.');
            $table->unsignedTinyInteger('exp_app_govt')->comment('Indicator if position held is in the public or government employment. [0-No, 1-Yes].');
            $table->string('exp_app_rel_fields')->comment('Related fields of work. Added to provide additional data to compare with related keywords.');
            $table->primary(['exp_app_id', 'exp_app_time']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tblapplicants_experiences');
    }
}
