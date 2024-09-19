import classes from './Missing.module.css'

const Missing = () => {
  return (
    <>
    <div className={classes.container}>
    <div className={classes.text}>We are sorry you cant access this page!</div>
    <div className={classes.text}>This page is only reachable by administrators , or the URL may be non existent </div>
    </div>

    </>

  )
}

export default Missing