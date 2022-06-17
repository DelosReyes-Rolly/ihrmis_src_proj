<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddForeignKeysToTblemployeeTrainingsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('tblemployee_trainings', function (Blueprint $table) {
            $table->foreign('trn_emp_id', 'tblemployee_trainings_ibfk_1')->references('emp_id')->on('tblemployees');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('tblemployee_trainings', function (Blueprint $table) {
            $table->dropForeign('tblemployee_trainings_ibfk_1');
        });
    }
}
