<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddForeignKeysToTblemployeeEducationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('tblemployee_educations', function (Blueprint $table) {
            $table->foreign('edu_emp_id', 'tblemployee_educations_ibfk_1')->references('emp_id')->on('tblemployees')->onUpdate('CASCADE')->onDelete('CASCADE');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('tblemployee_educations', function (Blueprint $table) {
            $table->dropForeign('tblemployee_educations_ibfk_1');
        });
    }
}
