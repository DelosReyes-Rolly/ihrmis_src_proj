<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddForeignKeysToTblpositionCscStandardsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('tblposition_csc_standards', function (Blueprint $table) {
            $table->foreign('std_pos_id', 'tblposition_csc_standards_ibfk_1')->references('pos_id')->on('tblpositions')->onUpdate('CASCADE')->onDelete('CASCADE');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('tblposition_csc_standards', function (Blueprint $table) {
            $table->dropForeign('tblposition_csc_standards_ibfk_1');
        });
    }
}
