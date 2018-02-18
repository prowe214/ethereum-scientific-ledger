pragma solidity ^0.4.19;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/PublicationFactory.sol";

contract TestPublication {
    PublicationFactory publication = PublicationFactory(DeployedAddresses.PublicationFactory());

    function testUserCanCreatePublication() public {
        publication.createPublication("Bufficorn", "Brian");
        bool isReviewed = publication.getPublicationPeerReviewed();
        Assert.equal(isReviewed, false, "WTF");
    }
}
