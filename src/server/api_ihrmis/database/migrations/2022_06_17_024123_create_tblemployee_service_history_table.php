<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTblemployeeServiceHistoryTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tblemployee_service_history', function (Blueprint $table) {
            $table->unsignedInteger('svc_emp_id')->index('svc_emp_id')->comment('Employee ID. Identifies the related employee.');
            $table->date('svc_date')->comment('Date of effectivity of the action or movement.');
            $table->unsignedTinyInteger('svc_act_id')->comment('Action Id. Identifies the specific action being referred to.');
            $table->unsignedInteger('svc_itm_id')->comment('Plantilla item ID. Identifies plantilla item being referenced to determine his/her current position.');
            $table->unsignedTinyInteger('svc_status')->comment('Status of current employment service. (In-Service, Study Leave, AWOL, etc.)');
            $table->decimal('svc_salary', 14)->unsigned()->comment('Current actual salary.');
            $table->string('svc_remarks')->comment('Remarks. Includes but not limited to comments, explanation, notes, etc.');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tblemployee_service_history');
    }
}
