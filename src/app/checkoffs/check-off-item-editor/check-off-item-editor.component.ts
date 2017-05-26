import {Component,EventEmitter,Input,OnInit,Output,ViewChildren} from '@angular/core';
import {CheckOffItem} from "../../global/_models/check-off-item.model";
import {CheckOffService} from "../../global/_services/check-off.service";
import {Logger} from "../../global/_services/logger.service";
import {UtilService} from "../../global/_services/utils.service";

@Component({
  selector: 'check-off-item-editor',
  templateUrl: './check-off-item-editor.component.html',
  styleUrls: ['./check-off-item-editor.component.less']
})
export class CheckOffItemEditorComponent implements OnInit {
	
	constructor(private CheckOffService:CheckOffService,private UtilService:UtilService,private Logger:Logger) { }
	
	@Input() item:CheckOffItem;
	@Output() onCancel: EventEmitter<any> = new EventEmitter();
	@Output() onSave: EventEmitter<any> = new EventEmitter();
	@ViewChildren('itemName') vc;
	
	originalData: CheckOffItem;
	errorData:any = {};
	
	ngAfterViewInit() {
		this.vc.first.nativeElement.focus();
	}
	ngOnInit() {
		this.originalData = Object.assign({},this.item);
		
		this.Logger.log('Initialized check-off-item-editor with item data',this.item)
	}
	
	cancelEdit() {
		//console.log('cancelEdit from task-list-item-editor');
		for (let key in this.originalData) {
			this.item[key] = this.originalData[key];
		}
		this.onCancel.emit();
	}
	
	createItem() {
		console.log('create item');
		let itemList = this.CheckOffService.getItemsForUser();
		itemList.push(this.item);
		this.doSubmitSuccess(this.item);
	}
	
	doSubmitError(error) {
		this.errorData = {};
		
		switch(error.code) {
			case "PERMISSION_DENIED":
				this.errorData.submitError = 'You do not have permission to update this list.';
				alert(this.errorData.submitError);
				//console.log('no dice');
				break;
		}
	}
	
	doSubmitSuccess(data) {
		console.log('submit success');
		this.onSave.emit();
	}
	
	getPlaceholder() {
		let ret:String = '';
		/*if (this.item.$key) {
			ret = 'Edit item';
		} else {
			let depth = (this.path.match(/items/g) || []).length;
			//console.log('depth',depth);
			if (depth > 0) {
				ret = 'New subitem';
			} else {
				ret = 'New item';
			}
		}*/
		ret = "New CheckOff Item";
		return ret;
	}
	
	save() {
		console.log('Firing Save for ',this.item);
		if (this.validate()) {
			this.item = this.UtilService.scrubData(this.item);
			this.item.$key ? this.updateItem() : this.createItem();
		}
	}
	
	updateItem() {
		let itemToSave = this.CheckOffService.getItem(this.item.$key);
		let promise = itemToSave.update(this.item);
		
		promise
			.then(data => this.doSubmitSuccess(data))
			.catch(error => this.doSubmitError(error));
	}
	
	validate() {
		let isValid:Boolean = true;
		this.errorData = {};
		if (!this.item.name || !this.item.name.length) {
			isValid = false;
			this.errorData.name = "Each item must have a name";
		}
		return isValid;
	}
}
