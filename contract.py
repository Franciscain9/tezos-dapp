import smartpy as sp


class VotingContract(sp.Contract):
    def __init__(self):
        self.init(votesRecord= sp.map(tkey = sp.TString , tvalue = sp.TInt))
        
    
    @sp.entry_point
    def set_candidate(self, params) : 
        sp.if ~ self.data.votesRecord.contains(params.candidate):
            self.data.votesRecord[params.candidate] = 0
        sp.else :
            sp.failwith('Candidate already exist')
    
    @sp.entry_point
    def vote(self,params):
        sp.if self.data.votesRecord.contains(params.candidate):
            self.data.votesRecord[params.candidate] +=1
        sp.else :
            sp.failwith('Doesnt exist')
                
@sp.add_test(name="Voting test")
def test():
    obj = VotingContract()
    scenario = sp.test_scenario()
    scenario+=obj
    scenario+=obj.set_candidate(candidate="Modi")
    scenario+=obj.vote(candidate="Modi")
    scenario+=obj.set_candidate(candidate="Modi")