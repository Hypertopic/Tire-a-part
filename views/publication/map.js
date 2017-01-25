function(doc) { 
  if (doc._id) { 
    emit("2017-01-20", { 
        id: doc._id,
    	rev: doc._rev,
    	citation_epage: doc['DC.citation.epage'],
    	citation_issue: doc['DC.citation.issue'],
    	citation_spage: doc['DC.citation.spage'],
    	citation_volume: doc['DC.citation.volume'],
    	description_abstract: doc['DC.description.abstract'],
    	creator: doc['DC.creator'],
    	issued: doc['DC.issued'],
    	publisher: doc['DC.publisher'],
    	relation_ispartof: (doc['DC.relation.ispartof']!='')?doc['DC.relation.ispartof']:null,
    	title: doc['DC.title'],
    	affiliation: doc.affiliation,
    	timestamp: doc['timestamp']||"2016-09-01T00:00:00.000Z"
    	});     
  	} 
};


