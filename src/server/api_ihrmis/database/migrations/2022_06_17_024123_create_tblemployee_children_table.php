<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTblemployeeChildrenTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tblemployee_children', function (Blueprint $table) {
            $table->unsignedInteger('chi_emp_id')->comment('Employee ID. Identifies the related employee.');
            $table->string('chi_emp_name', 150)->comment('Child\'s full name.');
            $table->date('chi_emp_birthdate')->comment('Child\'s birthdate or date of birth.');
            $table->primary(['chi_emp_id', 'chi_emp_name']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tblemployee_children');
    }
}
