<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddForeignKeysToTblemployeeCseligibilitiesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('tblemployee_cseligibilities', function (Blueprint $table) {
            $table->foreign('cse_emp_id', 'tblemployee_cseligibilities_ibfk_1')->references('emp_id')->on('tblemployees')->onUpdate('CASCADE')->onDelete('CASCADE');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('tblemployee_cseligibilities', function (Blueprint $table) {
            $table->dropForeign('tblemployee_cseligibilities_ibfk_1');
        });
    }
}
