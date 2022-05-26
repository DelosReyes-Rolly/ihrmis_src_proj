<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTblpositionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tblpositions', function (Blueprint $table) {
            $table->increments('pos_id')->comment('Position ID. A unique identification of records.');
            $table->string('pos_title', 150)->comment('Position title.');
            $table->string('pos_short_name', 20)->comment('Short name or acronym.');
            $table->unsignedTinyInteger('pos_salary_grade')->comment('Salary grade.');
            $table->char('pos_category', 2)->comment('Categorization of a position classification. [CE-Constitutional Official/Executive, PS-Professional Supervisory, PN-Professional Non-Supervisory, SS-Sub-Professional Supervisory, SN-Sub-Professional Non-Supervisory].');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tblpositions');
    }
}
