<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTblpositionCscStandardsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tblposition_csc_standards', function (Blueprint $table) {
            $table->unsignedInteger('std_pos_id')->comment('Position ID. Identifies the related position.');
            $table->char('std_type', 2)->comment('
Define the type of standards being referred to. [CS-Eligibility, ED-Education, EX-Experience, TR-Training].');
            $table->unsignedTinyInteger('std_quantity')->comment('Number of hours/years/level required. Data provided will serve as reference for comparison.');
            $table->string('std_keyword')->comment('Keywords of specific standard required. Data provided will serve as reference for comparison.');
            $table->text('std_specifics')->comment('Specific statement of the requirement for reporting purposes.');
            $table->primary(['std_pos_id', 'std_type']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tblposition_csc_standards');
    }
}
