        implicit double precision(p,q)
        character*512 input_file, output_file
        parameter (ndegreemax=50000,nsize=ndegreemax+1)   !maximum observed degree
        dimension p(0:ndegreemax)

        INTEGER :: i, numeropuntos
        double precision qini

        CHARACTER(len=512) :: arg
        i = 0
        
        DO i=0,nsize-1
            p(i)=0.
        END DO 
        
        CALL GET_COMMAND_ARGUMENT(1, arg)
        input_file = arg
        WRITE (*,*)"input_file:", TRIM(input_file)
        CALL GET_COMMAND_ARGUMENT(2, arg)
        output_file = arg
        WRITE (*,*)"output_file:", TRIM(output_file)
        CALL GET_COMMAND_ARGUMENT(3, arg)
        read(arg, *) qini
        WRITE (*,*)"qini:", qini
        CALL GET_COMMAND_ARGUMENT(4, arg)
        read(arg, *) numeropuntos
        WRITE (*,*)"numeropuntos:", numeropuntos
        open(1,file=input_file,status='unknown')
        open(2,file=output_file,status='unknown')
        nmin=1000000000
        nmax=0
        DO while(.true.) 
            read(1,*,END=30) j,pp
            p(j)=pp
            if(j.ge.nmax) nmax=j
            if(j.le.nmin) nmin=j
        END DO

30      continue
        print*,nmax
        close(1)

        DO i=0,nmax
            IF(i.lt.qini)then
                IF(p(i).gt.0.) write(2,200) dble(i),p(i)
            END IF
        END DO 
            
        qexp=0.0000001+(dble(nmax)/qini)**(1./dble(numeropuntos))
            
        xini=qini
        
        DO i=2,numeropuntos+1
            xfin=qini*qexp**(i-1)    
            qnorm=0.
            qpos=0.
            DO j=0,nmax
                IF((j.ge.xini).AND.(j.lt.xfin))then
                    qnorm=qnorm+p(j)
                    qpos=qpos+dble(j)*p(j)
                ENDIF
            END DO
            IF(qnorm.gt.0.)then
                write(2,200) qpos/qnorm,qnorm/(xfin-xini)
            END IF
            xini=xfin
        END DO
        close(2)

        stop

200     format(d18.12,1x,d18.12)
        END