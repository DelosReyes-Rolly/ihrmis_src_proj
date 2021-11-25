<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTbldocumentaryRequirementsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tbldocumentary_requirements', function (Blueprint $table) {
            $table->increments('doc_id')->comment('A unique identification of records.');
            $table->string('doc_name', 150)->comment('Name or description of the document.');
            $table->char('doc_group', 3)->comment('Group/category/section where the document is classified.');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tbldocumentary_requirements');
    }
}
