<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTblagenciesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tblagencies', function (Blueprint $table) {
            $table->increments('agn_id')->comment('Agency ID. A unique identification of records.');
            $table->string('agn_name', 150)->comment('Name of agency.');
            $table->string('agn_acronym', 30)->comment('Short name or acronym.');
            $table->char('agn_sector', 3)->comment('Sector or cluster where agency belongs. [DCO (DOST-CO), DRO (DOST-RO), DAA (DOST Attached Agency), COB (Constitutional Bodies), NGA, GOC (GOCC), LGU, SUC, PUC, NGO, PRI (Private), OTH (Others)]');
            $table->string('agn_head_name', 150)->comment('Name of the head of the agency.');
            $table->string('agn_head_position', 150)->comment('Position title of the head of the agency.');
            $table->string('agn_head_email', 100)->comment('Email address of the head of the agency.');
            $table->string('agn_address')->comment('Address of the agency.');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tblagencies');
    }
}
