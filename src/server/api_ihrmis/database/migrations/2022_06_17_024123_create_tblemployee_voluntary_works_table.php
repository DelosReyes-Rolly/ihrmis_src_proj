<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTblemployeeVoluntaryWorksTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tblemployee_voluntary_works', function (Blueprint $table) {
            $table->integer('vol_id', true)->comment('Voluntary table identifier');
            $table->unsignedInteger('vol_emp_id')->index('vol_emp_id')->comment('Employee ID. Identifies the related employee.');
            $table->string('vol_emp_org')->comment('Full name of the organization where involved as voluntary worker.');
            $table->string('vol_emp_addr')->comment('Address of the organization.');
            $table->date('vol_emp_from')->comment('Starting date of involvement.');
            $table->date('vol_emp_to')->comment('Ending date of involvement.');
            $table->unsignedTinyInteger('vol_emp_hours')->comment('Number of hours rendered.');
            $table->string('vol_emp_work', 150)->comment('Position or voluntary work rendered.');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tblemployee_voluntary_works');
    }
}
