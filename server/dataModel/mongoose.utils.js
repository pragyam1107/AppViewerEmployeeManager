var defaultSchemaOption = {
	timestamps : {
		createdAt : 'createdon',
		updatedAt : 'modifiedon'
	}, 
	toObject: {
		virtuals: true
	},
	toJSON: {
		virtuals: true 
	},
	usePushEach: true
};

module.exports = {
	defaultSchemaOption : defaultSchemaOption
};