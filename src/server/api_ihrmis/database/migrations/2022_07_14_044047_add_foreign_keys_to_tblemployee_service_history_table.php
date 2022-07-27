<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddForeignKeysToTblemployeeServiceHistoryTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('tblemployee_service_history', function (Blueprint $table) {
            $table->foreign('svc_emp_id', 'tblemployee_service_history_ibfk_1')->references('emp_id')->on('tblemployees')->onUpdate('CASCADE')->onDelete('CASCADE');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('tblemployee_service_history', function (Blueprint $table) {
            $table->dropForeign('tblemployee_service_history_ibfk_1');
        });
    }
}
