<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTbljvsCmptncyRatingsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tbljvs_cmptncy_ratings', function (Blueprint $table) {
            $table->unsignedInteger('rtg_id')->comment('JVS ID. Identifies the related JVS-CR form.');
            $table->char('rtg_com_type', 2)->comment('Competency Type. Identifies the job competency being referenced.');
            $table->unsignedTinyInteger('rtg_seq_order')->comment('Sequence order of creation. ');
            $table->string('rtg_factor')->comment('Desired scale factor.');
            $table->unsignedTinyInteger('rtg_percent')->comment('Desired factor weight in percentage.');
            $table->primary(['rtg_id', 'rtg_com_type', 'rtg_seq_order']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tbljvs_cmptncy_ratings');
    }
}
