<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTblemployeeExperiencesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tblemployee_experiences', function (Blueprint $table) {
            $table->integer('exp_id', true)->comment('Work Experience Identifier');
            $table->unsignedInteger('exp_emp_id')->index('exp_emp_id')->comment('Employee ID. Identifies the related employee.');
            $table->date('exp_emp_from')->comment('Starting date of affiliation.');
            $table->date('exp_emp_to')->comment('Ending date of affiliation.');
            $table->string('exp_emp_position', 150)->comment('Title of position held.');
            $table->string('exp_emp_agency')->comment('Name of department/agency/office/company in full.');
            $table->decimal('exp_emp_salary', 14)->unsigned()->comment('Monthly salary in figures.');
            $table->unsignedTinyInteger('exp_emp_grade')->nullable()->comment('Salary grade, if applicable.');
            $table->unsignedTinyInteger('exp_emp_step')->nullable()->comment('Salary step increment, if applicable.');
            $table->char('exp_emp_appntmnt', 2)->comment('Status of employment or appointment.');
            $table->unsignedTinyInteger('exp_emp_govt')->comment('Indicator if position held is in the public or government employment. [0-No, 1-Yes].');
            $table->string('exp_emp_rel_fields')->comment('Related fields of work. Added to provide additional data to compare with related keywords.');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tblemployee_experiences');
    }
}
