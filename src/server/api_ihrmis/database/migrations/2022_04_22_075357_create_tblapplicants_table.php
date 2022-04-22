<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTblapplicantsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tblapplicants', function (Blueprint $table) {
            $table->increments('app_id')->comment('Applicant ID. A unique identification of records.');
            $table->unsignedInteger('app_itm_id')->comment('Plantilla item ID. Identifies plantilla item being referenced.');
            $table->unsignedInteger('app_emp_id')->comment('Employee ID. Identifies employee being referenced.');
            $table->dateTime('app_sts_time')->comment('Date and time ID that refers to the current status of the applicant.');
            $table->date('app_appntmnt')->comment('Date the candidate was appointed.');
            $table->date('app_assmptn')->comment('Date of assumption of the appointed applicant.');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tblapplicants');
    }
}
