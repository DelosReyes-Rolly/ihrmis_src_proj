<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTblemployeeEducationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tblemployee_educations', function (Blueprint $table) {
            $table->integer('edu_id', true)->comment('EMployee Education identifier');
            $table->unsignedInteger('edu_emp_id')->index('edu_emp_id')->comment('Employee ID. Identifies the related employee.');
            $table->unsignedTinyInteger('edu_emp_level')->comment('Level of education. [0-NA, 1-Elementary, 2-Secondary, 3-Vocational/Trade, 4-College, 5-Graduate Studies (Master\'s), 6-Graduate Studies (Doctorate)].');
            $table->string('edu_emp_school')->comment('Name of school in full.');
            $table->year('edu_emp_from')->comment('Starting period of attendance in academic year.');
            $table->year('edu_emp_to')->comment('Ending period of attendance in academic year.');
            $table->string('edu_emp_degree', 150)->comment('Basic education/degree/course indicate in full.');
            $table->year('edu_emp_graduated')->comment('Year of graduation if graduated.');
            $table->string('edu_emp_units', 50)->comment('Highest level or units earned if not graduated.');
            $table->string('edu_emp_honors', 150)->comment('Scholarship or academic honor received.');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tblemployee_educations');
    }
}
