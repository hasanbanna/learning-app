const config = {
	port: process.env.PORT || 8081,
	db: process.env.MONGOLAB_URI || "mongodb://localhost:27017/knowledge_tree",
	test_port: 2001,
	test_db: "mongodb://localhost:27017/knowledge_tree_test"
}
module.exports = config;
