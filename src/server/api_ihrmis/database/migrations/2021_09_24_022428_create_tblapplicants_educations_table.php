<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTblapplicantsEducationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tblapplicants_educations', function (Blueprint $table) {
            $table->unsignedInteger('edu_app_id')->comment('Applicant ID. Identifies the related applicant.');
            $table->dateTime('edu_app_time')->useCurrent()->comment('Timestamp or date and time the record is created. Served as a secondary key for a unique identification of records.');
            $table->unsignedTinyInteger('edu_app_level')->comment('Level of education. [0-NA, 1-Elementary, 2-Secondary, 3-Vocational/Trade, 4-College, 5-Graduate Studies].');
            $table->string('edu_app_school')->comment('Name of school in full.');
            $table->year('edu_app_from')->comment('Starting period of attendance in academic year.');
            $table->year('edu_app_to')->comment('Ending period of attendance in academic year.');
            $table->string('edu_app_degree', 150)->comment('Basic education/degree/course indicate in full.');
            $table->year('edu_app_graduated')->comment('Year of graduation if graduated.');
            $table->string('edu_app_units', 50)->comment('Highest level or units earned if not graduated.');
            $table->string('edu_app_honors', 150)->comment('Scholarship or academic honor received.');
            $table->primary(['edu_app_id', 'edu_app_time']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tblapplicants_educations');
    }
}
