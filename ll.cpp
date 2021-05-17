bool isSubPath(ListNode* head, TreeNode* root) {
	if(head==NULL){
		return true;
	}        
	if(root==NULL){
		return false;
	}
	if(head->val == root->val){
		if(isSubPath(head->next,root->left)){
			return true;
		}
		return isSubPath(head->next,root->right);
	}
	if(isSubPath(head,root->left))
		return true;
	
	return isSubPath(head,root->right);

}