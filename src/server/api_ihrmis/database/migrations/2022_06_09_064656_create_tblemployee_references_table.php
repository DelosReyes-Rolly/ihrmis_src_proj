<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTblemployeeReferencesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tblemployee_references', function (Blueprint $table) {
            $table->integer('ref_id', true)->comment('reference_identifier');
            $table->unsignedInteger('ref_emp_id')->index('ref_emp_id')->comment('Employee Identifier');
            $table->string('ref_emp_email', 100)->comment('Employee Reference\'s Email Address');
            $table->string('ref_emp_name', 150)->comment('Employee Reference\'s Name');
            $table->string('ref_emp_addr')->comment('Employee Reference\'s Address');
            $table->string('ref_emp_tel_no', 50)->comment('Employee Telephone Number');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tblemployee_references');
    }
}
