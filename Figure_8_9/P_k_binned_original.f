      implicit double precision(p,q)
      character*40 filename1,filename2
      parameter (ndegreemax=50000,nsize=ndegreemax+1)   !maximum observed degree
	  dimension p(0:ndegreemax)

      do i=0,nsize
	   p(i)=0.
	  enddo      

      print*,'este programa calcula binnings exponenciales de       '
      print*,'distribuciones discretas de variables enteras positivas'
      print*,'El fichero de salida se llama P_k_binned.dat          '
      print*,'                                                      '
      print*,'                                                      '
      print*,'probability filename?'
	  print*,'(fed it with the non binned distribution i p(i)       '
      read*,filename1
      
	  print*,'initial position for the binning?'
	  print*,'(better a non integer value but it also work otherwise)'
	  read*,qini
      
      print*,'How many points do you want?'
	  read*,numeropuntos
      
	  
c%%%%%%%%%%%%%%%%%%Survival probability%%%%%%%%%%%%%%%%%%%%%%%%%%%%%


      
      open(1,file=filename1,status='unknown')
      open(2,file='P_k_binned.dat',status='unknown')

      
      nmin=1000000000
	  nmax=0
      do while(.true.)	   
	   read(1,*,END=30) j,pp
	   p(j)=pp
	   if(j.ge.nmax) nmax=j
	   if(j.le.nmin) nmin=j
	  enddo
30	  continue
	  print*,nmax
      close(1)

      do i=0,nmax
	   if(i.lt.qini)then
	    if(p(i).gt.0.) write(2,200) dble(i),p(i)
	   endif
	  enddo 
	  
	  qexp=0.0000001+(dble(nmax)/qini)**(1./dble(numeropuntos))
	  
	  xini=qini
	  do i=2,numeropuntos+1		
		xfin=qini*qexp**(i-1)
		
		
		qnorm=0.
		qpos=0.
		do j=0,nmax				  
	      if((j.ge.xini).AND.(j.lt.xfin))then
		  qnorm=qnorm+p(j)
		  qpos=qpos+dble(j)*p(j)
		  endif
		enddo
		if(qnorm.gt.0.)then
		 write(2,200) qpos/qnorm,qnorm/(xfin-xini)
		endif
		xini=xfin
	  enddo	  
	  
	  
      close(2)

      stop
200   format(d18.12,1x,d18.12)
      end
