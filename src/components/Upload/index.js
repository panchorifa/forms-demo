import React, {Component} from 'react';
import './Upload.css';


class Upload extends Component {
  render() {
    return (
			<form id="fileupload" action="//jquery-file-upload.appspot.com/" name="file_upload_form" method="POST" enctype="multipart/form-data">
				<div className="card">
					<div className="card-header card-header-inverse">
						<h4 className="card-header-title text-left">Form Upload</h4>
					</div>
					<div className="card-body">
						<p className="f-s-12 text-muted m-b-15 text-left">
							Upload your form definition files (xlsx).<br/>
						</p>
						<div className="row fileupload-buttonbar">
							<div className="col-md-8">
								<span className="btn btn-primary fileinput-button btn-sm m-r-3 m-b-3">
									<i className="fa fa-fw fa-plus"></i>
									<span>Add files...</span>
									<input type="file" name="files[]" multiple/>
								</span>
								<button type="submit" className="btn btn-default btn-sm m-r-3 m-b-3 start">
									<i className="fa fa-fw fa-upload"></i>
									<span>Start upload</span>
								</button>
								<button type="reset" className="btn btn-default btn-sm m-r-3 m-b-3 cancel">
									<i className="fa fa-fw fa-ban"></i>
									<span>Cancel upload</span>
								</button>
								<button type="button" className="btn btn-default btn-sm m-r-3 m-b-3 delete">
									<i className="fa fa-fw fa-trash"></i>
									<span>Delete</span>
								</button>
								<div className="checkbox-inline m-t-3 m-l-10">
									<input type="checkbox" id="toggle-delete" className="toggle" />
									<label for="toggle-delete">Select Files</label>
								</div>
								<span className="fileupload-process"></span>
							</div>
							<div className="col-md-4 fileupload-progress fade">
								<div className="f-s-10 text-muted m-b-5"><b>PROGRESS:</b></div>
								<div className="progress progress-striped progress-sm m-b-0 m-t-0 active" role="progressbar" aria-valuemin="0" aria-valuemax="100">
									<div className="progress-bar progress-bar-primary"
                    styleName="width:0%; min-width: 2em;"></div>
								</div>
							</div>
						</div>
						<div id="error-msg"></div>
					</div>
					<table role="presentation" className="table m-b-0">
						<thead>
							<tr>
								<th styleName="width:160px">PREVIEW</th>
								<th>FILENAME</th>
								<th styleName="width:250px">SIZE</th>
								<th styleName="width:1%">ACTION</th>
							</tr>
						</thead>
						<tbody className="files">
							<tr className="empty-row">
								<td colspan="4" className="text-center p-20">
									<div className="text-muted" styleName="font-size: 36px;"><i className="fa fa-file-archive"></i></div>
									No file uploaded
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</form>
    )
  }
}

export default Upload;
