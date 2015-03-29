export default function() {

  this.transition(
    this.childOf('.transition-piece'),
    this.use('toUp', {duration: 500})
  );

  this.transition(
    this.toRoute('users.new'),
    this.use('toUp')
  );
  
}
