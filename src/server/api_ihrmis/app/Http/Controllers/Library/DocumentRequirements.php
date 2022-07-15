<?php

namespace App\Http\Controllers\Library;

use App\Http\Controllers\Controller;
use App\Http\Resources\CommonResource;
use App\Models\Library\DocumentRequirements as LibraryDocumentRequirements;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DocumentRequirements extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $item_qry = DB::select('SELECT b.grp_id,GROUP_CONCAT(a.doc_name SEPARATOR ", ") as doc_name,b.grp_name,b.grp_cluster 
        from tbldocumentary_requirements as a 
        LEFT JOIN tblcategory_groups as b on a.doc_group = b.grp_id 
        GROUP BY b.grp_name, b.grp_id
        ORDER BY b.grp_id
        ');
        return response()->json($item_qry);
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        if (!empty($request->document)) {
            foreach ($request->document as $document) {
                if (empty($document['doc_id'])) {
                    $query = new LibraryDocumentRequirements;
                } else {
                    $query = LibraryDocumentRequirements::firstOrNew(["doc_id" => $document['doc_id']]);
                }
                $query->doc_itm_order = $document['doc_itm_order'];
                $query->doc_name = $document['doc_name'];
                $query->doc_group = $request->doc_group;
                $query->save();
            }
            return response()->json([
                "message" => "Success"
            ]);
        } else {
            LibraryDocumentRequirements::where('doc_group', $request->doc_group)->delete();
            return response()->json([
                'status' => 200,
                'message' => "Deleted Succesfully",
            ]);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($doc_group)
    {
        LibraryDocumentRequirements::where('doc_group', $doc_group)->delete();
        return response()->json([
            'status' => 200,
            'message' => "Deleted Succesfully",
        ]);
    }

    public function show($id)
    {
        return CommonResource::collection(
            LibraryDocumentRequirements::whereHas('Category', function ($query) use ($id) {
                return $query->where('tblcategory_groups.grp_id', $id);
            })->get(),
        );
    }
}
