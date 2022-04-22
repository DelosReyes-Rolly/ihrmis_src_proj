<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTblemployeesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tblemployees', function (Blueprint $table) {
            $table->increments('emp_id')->comment('Employee ID. A unique identification of the record.');
            $table->string('emp_no', 15)->comment('Employee number. Employee ID number assigned by the agency.');
            $table->string('emp_nm_last', 50)->comment('Last name or surname.');
            $table->string('emp_nm_first', 50)->comment('First or given name.');
            $table->string('emp_nm_mid', 50)->comment('Middle name in full.');
            $table->string('emp_nm_extn', 10)->comment('Name extension, if any. (e.g. Jr., Sr.)');
            $table->string('emp_title', 30)->comment('Name title. If none default to "Ms." or "Mr.".');
            $table->string('emp_ofc_email', 100)->comment('Official email address issued by the department.');
            $table->unsignedInteger('emp_itm_id')->comment('Plantilla item ID. Identifies plantilla item being referenced to determine his/her current position.');
            $table->date('emp_appntmnt_start')->comment('Starting date of appointment.');
            $table->date('emp_appntmnt_end')->comment('Ending date of appointment if not permanent in nature.');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tblemployees');
    }
}
