pragma solidity ^0.4.19;

contract PublicationFactory {
  //storage and variables
  Publication[] public publications;

  //events
  event NewPublication(uint id, string author);

  //models
  struct Publication {
    //uint reviewedStudyId; //MAY NOT NEED THIS
    string title;
    /* string abs;
    string introduction;
    string methods;
    string results;
    string discussion;
    string[] citations; */
    string author;
    /* string[] keywords; //maybe this can be mapped as well */
    bool isPeerReview;
    uint publishDate;
  }

  //mappings
  mapping(uint => uint) public publicationToReview;
  mapping(uint => address) public publicationToOwner;
  /* mapping(uint => string) public publicationToKeywords; //may not need this */

  //modifier
  /* modifier goodCreationValues(bool _isPeerReviewed) { */
    /* require(_title.length != 0 && _abs.length != 0); */ //todo: can we validate on the front end?
    /* require(_isPeerReviewed == false);
    _;
  } */

  //methods
  /* function _createPublication(string _title, string _abs, string _introduction, string _methods, string _results, string _discussion, string[] _citations, string _author, string[] _keywords, bool _isPeerReviewed, uint _publishDate) internal { */
  function _createPublication(string _title, string _author, bool _isPeerReviewed, uint _publishDate) internal {
     uint id = publications.push(Publication(_title, _author, _isPeerReviewed, _publishDate)) - 1;
      //publicationToReviewer


      //publicationToOwner
      publicationToOwner[id] = msg.sender;

      //publicationToKeywords

      NewPublication(id, _author);
  }

  function createPublication(string _title, string _author) public {
    _createPublication(_title, _author, false, uint32(now));
  }

  function getPublicationPeerReviewed() public returns (bool) {
    // THERE IS NO PUBLICATION YET
      Publication storage firstPub = publications[0];
      return firstPub.isPeerReview;
  }

}
