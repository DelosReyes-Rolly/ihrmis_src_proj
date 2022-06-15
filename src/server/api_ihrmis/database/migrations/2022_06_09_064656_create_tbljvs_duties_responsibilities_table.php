<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTbljvsDutiesResponsibilitiesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tbljvs_duties_responsibilities', function (Blueprint $table) {
            $table->unsignedInteger('dty_jvs_id')->comment('JVS ID. Identifies the related JVS-CR form.');
            $table->unsignedTinyInteger('dty_jvs_order')->comment('Sequence order in the list.');
            $table->string('dty_jvs_desc')->comment('Description of the duty or responsibility.');
            $table->primary(['dty_jvs_id', 'dty_jvs_order']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tbljvs_duties_responsibilities');
    }
}
